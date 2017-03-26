import React, {Component} from 'react';
import EstabForm from './establishments/EstabForm';
import Foursquare from '../../foursquareApiKey';
import superagent from 'superagent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Establishment extends Component {
    constructor() {
        super();
        this.state = {
            venueAddress: '',
            venueCrossStreet: '',
            venueId: '',
            venueName: ''
        }
    }

    componentDidMount() {
        const url = 'https://api.foursquare.com/v2/venues/' +
                    `${this.props.params.eId}?v=20140806&client_id=` +
                    `${Foursquare.id}&client_secret=${Foursquare.secret}`

        superagent.get(url).query(null).
            set('Accept', 'text/json').
            then((response) => {
                const {venue} = response.body.response

                return this.setState({
                    venueAddress: venue.location.address,
                    venueCrossStreet: venue.location.crossStreet,
                    venueId: venue.id,
                    venueName: venue.name
                })
            }).
            then(() => superagent.get(`/bathroom/${this.state.venueId}`))
    }

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron text-center" id="jumbo">
                    <div className="well well-sm">
                        <h1>{ this.state.venueName }</h1>
                        <h2>{ this.state.venueAddress }</h2>
                        <h3>{ this.state.venueCrossStreet }</h3>
                    </div>
                </div>
                <br />

                <Tabs
                    onSelect={this.handleSelect}
                    selectedIndex={0}
                >
                  <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Form</Tab>
                  </TabList>

                  <TabPanel>
                    <h2>Hello, I will soon be the Estab Profile page</h2>
                  </TabPanel>
                  <TabPanel>
                    <EstabForm venueId={ this.state.venueId }/>
                  </TabPanel>
                </Tabs>
            </div>
        )
    }
}
