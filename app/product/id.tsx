import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, IconButton, Text, TextInput } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/menu';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
        <Button onPress={() => router.back()}>Volver</Button>
      </View>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        notes: notes || undefined,
      });
    }
    router.back();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Text style={styles.productImage}>{product.image}</Text>
          {product.isPopular && (
            <Chip style={styles.popularBadge} textStyle={styles.badgeText}>
              ⭐ Popular
            </Chip>
          )}
          {product.isNew && (
            <Chip style={styles.newBadge} textStyle={styles.badgeText}>
              Nuevo
            </Chip>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Rating */}
          <View style={styles.header}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviews}>(150+ reseñas)</Text>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.infoLabel}>Tiempo</Text>
              <Text style={styles.infoValue}>{product.cookTime}</Text>
            </View>
            
            <View style={styles.infoCard}>
              <MaterialCommunityIcons 
                name="truck-delivery" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.infoLabel}>Envío</Text>
              <Text style={styles.infoValue}>Gratis</Text>
            </View>
            
            <View style={styles.infoCard}>
              <MaterialCommunityIcons 
                name="fire" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={styles.infoLabel}>Calorías</Text>
              <Text style={styles.infoValue}>~450</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cantidad</Text>
            <View style={styles.quantitySelector}>
              <IconButton
                icon="minus"
                size={24}
                onPress={decreaseQuantity}
                style={styles.quantityButton}
                iconColor={theme.colors.primary}
              />
              <Text style={styles.quantity}>{quantity}</Text>
              <IconButton
                icon="plus"
                size={24}
                onPress={increaseQuantity}
                style={styles.quantityButton}
                iconColor={theme.colors.primary}
              />
            </View>
          </View>

          {/* Special Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas especiales (opcional)</Text>
            <TextInput
              mode="outlined"
              placeholder="Ej: Sin cebolla, picante aparte..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              style={styles.notesInput}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            ${totalPrice.toLocaleString('es-CO')}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleAddToCart}
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
          labelStyle={styles.addButtonLabel}
          icon="cart-plus"
        >
          Agregar al carrito
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    marginBottom: spacing.lg,
  },
  imageSection: {
    height: 300,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    fontSize: 120,
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: theme.colors.secondary,
  },
  newBadge: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    fontSize: 12,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: spacing.xs,
  },
  reviews: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  infoCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: spacing.md,
    borderRadius: theme.roundness,
    alignItems: 'center',
    elevation: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: spacing.xs,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: spacing.sm,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    margin: 0,
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: spacing.lg,
    minWidth: 40,
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: theme.colors.surface,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  addButton: {
    borderRadius: theme.roundness,
  },
  addButtonContent: {
    paddingVertical: spacing.sm,
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});