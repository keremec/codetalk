import React from 'react';
import {View, Text} from 'react-native';
import {formatDistance, parseISO} from 'date-fns';
import {enUS} from 'date-fns/locale';

import Styles from './MessageCard.style';

const MessageCard = ({item}) => {
  const {name, date, text} = item;
  const formattedDate = formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
    locale: enUS,
  });
  return (
    <View style={Styles.container}>
      <View style={Styles.inContainer}>
        <Text style={[Styles.text, Styles.metadata]}>{name}</Text>
        <Text style={[Styles.date, Styles.metadata]}>{formattedDate}</Text>
      </View>
      <View style={Styles.contentContainer}>
        <Text selectable={true} style={Styles.content}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default MessageCard;
