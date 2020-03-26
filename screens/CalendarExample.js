import React, {useEffect} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import * as Calendar from 'expo-calendar';

export default function CalendarExample() {
    useEffect(() => {
        (async () => {
            const {status} = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync();
                console.log('Here are all your calendars:');
                console.log({calendars});
            }
        })();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Calendar Module Example</Text>
            <Button title="Create a new calendar" onPress={createCalendar}/>
        </View>
    );
}

async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
}

async function createCalendar() {
    const defaultCalendarSource =
        Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : {isLocalAccount: true, name: 'pls'};
    const newCalendarID = await Calendar.createCalendarAsync({
        title: 'pls',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);

    const event = await createCalendarEvent(newCalendarID)

    console.log(`Your new calendar ID is: ${event}`);

}

async function createCalendarEvent(calendarId) {

    console.log(calendarId);

    const newEventID = await Calendar.createEventAsync(calendarId, {
        title: 'Test',
        startDate: new Date().getDate().toString(),
        endDate: new Date().getDate().toString(),
        timeZone: 'UTC',
        notes: 'text'
    });

    console.log(new Date().getDate().toString());
    console.log(`Your new event ID is: ${newEventID}`);

    return newEventID
}

