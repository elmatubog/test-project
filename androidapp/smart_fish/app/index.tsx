// FacilityMonitor.js
import React from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar } from 'react-native';
import ContainerCard from './ContainerCard';

// Dummy data
const facilityData = {
  outsideTemperature: '25°C',
  containers: [
    { id: 1, name: 'Container 1', temperature: '4°C', isActive: true },
    { id: 2, name: 'Container 2', temperature: '-18°C', isActive: true },
    { id: 3, name: 'Container 3', temperature: '28°C', isActive: false },
  ],
};

const FacilityMonitorDashboard = () => {
  return (
    // Use SafeAreaView to respect device boundaries
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />

      {/* 🌟 Simple Header 🌟 */}
      <View className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <Text className="text-2xl font-extrabold text-indigo-700">
          Facility Temp Dashboard
        </Text>
      </View>

      {/* The FlatList is used as the main view/scroll area */}
      <FlatList
        data={facilityData.containers}
        keyExtractor={(item) => item.id.toString()}
        
        // This is a crucial prop: Renders the elements BEFORE the main list
        ListHeaderComponent={() => (
          <View>
            {/* Outside Temperature Card */}
            <View className="p-4 m-4 border-l-4 border-yellow-500 rounded-lg shadow-lg bg-white">
              <Text className="text-lg font-semibold text-gray-600">
                Outside Facility Temperature
              </Text>
              <Text className="text-5xl font-bold text-yellow-600 mt-1">
                {facilityData.outsideTemperature}
              </Text>
            </View>

            {/* Container List Header */}
            <Text className="text-xl font-bold text-gray-800 px-4 pt-2 pb-1">
              📦 Container Status Overview
            </Text>
          </View>
        )}
        
        // Renders each individual container card
        renderItem={({ item }) => (
          <ContainerCard
            name={item.name}
            temperature={item.temperature}
            isActive={item.isActive}
          />
        )}
        
        // Add padding/margin to the bottom of the list
        ListFooterComponent={<View className="h-6" />}
      />
    </SafeAreaView>
  );
};

export default FacilityMonitorDashboard;