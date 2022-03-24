import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userImg = useSelector((state) => state.auth.userImg);
  const userName = useSelector((state) => state.auth.userName);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ margin: 50, fontSize: 30 }}>Profile</Text>
      <Text style={{ margin: 50, fontSize: 30 }}>
        {userName ?? 'unknown user'}
      </Text>
    </View>
  );
};

export default Profile;
