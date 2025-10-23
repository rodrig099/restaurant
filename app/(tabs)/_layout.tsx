import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { theme } from '../../constants/theme';
import { useCart } from '../../contexts/CartContext';

export default function TabLayout() {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menú',
          headerTitle: '🍽️ Sabor a Casa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrito',
          headerTitle: 'Mi Carrito',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="cart" size={size} color={color} />
              {cartCount > 0 && (
                <Badge style={styles.badge} size={18}>
                  {cartCount}
                </Badge>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          headerTitle: 'Mis Pedidos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerTitle: 'Mi Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: theme.colors.error,
  },
});