import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LobbyScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit('room:join', { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigation.navigate('RoomPage', { roomId: room });
    },
    [navigation]
  );

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <SafeAreaView>
       <View style={styles.container}>
      <Text>Email ID</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text>Room Number</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 8,
          borderRadius: 5,
        }}
        value={room}
        onChangeText={setRoom}
        placeholder="Enter room number"
      />

      <TouchableOpacity
        onPress={handleSubmitForm}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Join</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  container: {
    padding: 20,
  },
});

export default LobbyScreen;
