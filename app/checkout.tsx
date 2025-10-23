import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, RadioButton, Text, TextInput } from 'react-native-paper';
import { spacing, theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = getTotal();
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para realizar un pedido');
      router.push('/(auth)/login');
      return;
    }

    if (!user.addresses || user.addresses.length === 0) {
      Alert.alert('Error', 'Debes agregar una dirección de entrega');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      
      Alert.alert(
        '¡Pedido Exitoso! 🎉',
        'Tu pedido ha sido confirmado. Recibirás una notificación cuando esté en camino.',
        [
          {
            text: 'Ver Pedido',
            onPress: () => router.replace('/(tabs)/orders'),
          },
        ]
      );
    }, 2000);
  };

  const defaultAddress = user?.addresses?.find(addr => addr.isDefault) || user?.addresses?.[0];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="map-marker" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.cardTitle}>Dirección de Entrega</Text>
            </View>

            {defaultAddress ? (
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                  {defaultAddress.street}
                </Text>
                <Text style={styles.addressDetails}>
                  {defaultAddress.city}, {defaultAddress.zipCode}
                </Text>
                {defaultAddress.details && (
                  <Text style={styles.addressDetails}>
                    {defaultAddress.details}
                  </Text>
                )}
                <Button
                  mode="text"
                  onPress={() => {/* TODO: Change address */}}
                  style={styles.changeButton}
                >
                  Cambiar dirección
                </Button>
              </View>
            ) : (
              <View style={styles.noAddressContainer}>
                <Text style={styles.noAddressText}>
                  No tienes direcciones guardadas
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {/* TODO: Add address */}}
                  style={styles.addAddressButton}
                >
                  Agregar Dirección
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Order Summary */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="cart" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.cardTitle}>Resumen del Pedido</Text>
            </View>

            {items.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemEmoji}>{item.image}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toLocaleString('es-CO')}
                </Text>
              </View>
            ))}

            <Divider style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                ${subtotal.toLocaleString('es-CO')}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Domicilio</Text>
              <Text style={styles.summaryValue}>
                ${deliveryFee.toLocaleString('es-CO')}
              </Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${total.toLocaleString('es-CO')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Method */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="credit-card" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.cardTitle}>Método de Pago</Text>
            </View>

            <RadioButton.Group onValueChange={setPaymentMethod} value={paymentMethod}>
              <View style={styles.paymentOption}>
                <RadioButton.Android value="cash" color={theme.colors.primary} />
                <View style={styles.paymentInfo}>
                  <MaterialCommunityIcons 
                    name="cash" 
                    size={24} 
                    color={theme.colors.text} 
                  />
                  <View style={styles.paymentText}>
                    <Text style={styles.paymentLabel}>Efectivo</Text>
                    <Text style={styles.paymentDescription}>
                      Paga al recibir tu pedido
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.paymentOption}>
                <RadioButton.Android value="card" color={theme.colors.primary} />
                <View style={styles.paymentInfo}>
                  <MaterialCommunityIcons 
                    name="credit-card-outline" 
                    size={24} 
                    color={theme.colors.text} 
                  />
                  <View style={styles.paymentText}>
                    <Text style={styles.paymentLabel}>Tarjeta de Crédito/Débito</Text>
                    <Text style={styles.paymentDescription}>
                      Pago seguro en línea
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.paymentOption}>
                <RadioButton.Android value="nequi" color={theme.colors.primary} />
                <View style={styles.paymentInfo}>
                  <MaterialCommunityIcons 
                    name="cellphone" 
                    size={24} 
                    color={theme.colors.text} 
                  />
                  <View style={styles.paymentText}>
                    <Text style={styles.paymentLabel}>Nequi/Daviplata</Text>
                    <Text style={styles.paymentDescription}>
                      Transferencia desde tu app
                    </Text>
                  </View>
                </View>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Delivery Notes */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="note-text" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.cardTitle}>Notas para el Repartidor</Text>
            </View>

            <TextInput
              mode="outlined"
              placeholder="Ej: Tocar el timbre, dejar en portería..."
              value={deliveryNotes}
              onChangeText={setDeliveryNotes}
              multiline
              numberOfLines={3}
              style={styles.notesInput}
            />
          </Card.Content>
        </Card>

        {/* Estimated Time */}
        <View style={styles.estimatedTime}>
          <MaterialCommunityIcons 
            name="clock-outline" 
            size={20} 
            color={theme.colors.success} 
          />
          <Text style={styles.estimatedText}>
            Tiempo estimado de entrega: 30-45 min
          </Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handlePlaceOrder}
          loading={loading}
          disabled={loading || !defaultAddress}
          style={styles.orderButton}
          contentStyle={styles.orderButtonContent}
          labelStyle={styles.orderButtonLabel}
          icon="check"
        >
          Confirmar Pedido - ${total.toLocaleString('es-CO')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: spacing.sm,
  },
  addressContainer: {
    paddingLeft: spacing.lg,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  addressDetails: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: spacing.xs,
  },
  changeButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  noAddressContainer: {
    paddingLeft: spacing.lg,
    alignItems: 'flex-start',
  },
  noAddressText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
  },
  addAddressButton: {
    marginTop: spacing.sm,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingLeft: spacing.lg,
  },
  itemEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  divider: {
    marginVertical: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingLeft: spacing.lg,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: spacing.sm,
  },
  paymentText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  paymentDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  notesInput: {
    backgroundColor: theme.colors.background,
    marginTop: spacing.sm,
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: '#E8F5E9',
    borderRadius: theme.roundness,
  },
  estimatedText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.success,
    marginLeft: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
  },
  orderButton: {
    borderRadius: theme.roundness,
  },
  orderButtonContent: {
    paddingVertical: spacing.sm,
  },
  orderButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});