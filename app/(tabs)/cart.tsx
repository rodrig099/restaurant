import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, IconButton, Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';
import { CartItem, useCart } from '../../contexts/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();

  const deliveryFee = 5000;
  const subtotal = getTotal();
  const total = subtotal + deliveryFee;

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.cartItem}>
      <View style={styles.itemContent}>
        {/* Image */}
        <View style={styles.itemImage}>
          <Text style={styles.itemEmoji}>{item.image}</Text>
        </View>

        {/* Info */}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          {item.notes && (
            <Text style={styles.itemNotes} numberOfLines={2}>
              📝 {item.notes}
            </Text>
          )}
          <Text style={styles.itemPrice}>
            ${item.price.toLocaleString('es-CO')}
          </Text>
        </View>

        {/* Quantity Controls */}
        <View style={styles.itemControls}>
          <View style={styles.quantityControl}>
            <IconButton
              icon="minus-circle"
              size={24}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              iconColor={theme.colors.primary}
            />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <IconButton
              icon="plus-circle"
              size={24}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              iconColor={theme.colors.primary}
            />
          </View>
          
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            style={styles.deleteButton}
          >
            <MaterialCommunityIcons 
              name="trash-can-outline" 
              size={20} 
              color={theme.colors.error} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons 
          name="cart-outline" 
          size={100} 
          color={theme.colors.textSecondary} 
        />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptySubtitle}>
          Agrega productos deliciosos para comenzar
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/(tabs)')}
          style={styles.browseButton}
          contentStyle={styles.buttonContent}
        >
          Ver Menú
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </Text>
        <Button
          mode="text"
          onPress={clearCart}
          textColor={theme.colors.error}
        >
          Vaciar carrito
        </Button>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary */}
      <View style={styles.summary}>
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

        {/* Promo Section */}
        <View style={styles.promoSection}>
          <MaterialCommunityIcons 
            name="ticket-percent" 
            size={20} 
            color={theme.colors.success} 
          />
          <Text style={styles.promoText}>
            🎉 Envío gratis en pedidos sobre $50.000
          </Text>
        </View>

        {/* Checkout Button */}
        <Button
          mode="contained"
          onPress={() => router.push('/checkout')}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}
          labelStyle={styles.checkoutButtonLabel}
          icon="arrow-right"
        >
          Proceder al pago
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  cartItem: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 1,
  },
  itemContent: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  itemNotes: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  itemControls: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  deleteButton: {
    padding: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  browseButton: {
    paddingHorizontal: spacing.xl,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  summary: {
    backgroundColor: theme.colors.surface,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
  },
  divider: {
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  promoText: {
    fontSize: 14,
    color: theme.colors.success,
    marginLeft: spacing.sm,
    flex: 1,
  },
  checkoutButton: {
    borderRadius: theme.roundness,
  },
  checkoutButtonContent: {
    paddingVertical: spacing.sm,
  },
  checkoutButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});