// ContainerCard.js
import { View, Text } from 'react-native';

const ContainerCard = ({ name, temperature, isActive }) => {
  const statusColor = isActive ? 'bg-green-500' : 'bg-red-500';
  const statusText = isActive ? 'Active' : 'Inactive';
  const tempColor = isActive ? 'text-blue-600' : 'text-gray-400';

  return (
    <View className="p-4 mx-4 mb-4 border border-gray-200 rounded-xl shadow-md bg-white">
      <View className="flex-row items-center justify-between mb-2">
        {/* Container Name */}
        <Text className="text-xl font-bold text-gray-800">{name}</Text>

        {/* Status Indicator */}
        <View className={`px-3 py-1 rounded-full ${statusColor}`}>
          <Text className="text-sm font-semibold text-white">{statusText}</Text>
        </View>
      </View>

      {/* Temperature Display */}
      <Text className={`text-3xl font-extrabold ${tempColor}`}>
        {temperature}
      </Text>
    </View>
  );
};

export default ContainerCard;