import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, IconButton, Searchbar, Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';
import { useCart } from '../../contexts/CartContext';
import { categories, Product, products } from '../../data/menu';

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.lg * 3) / 2;

export default function MenuScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularProducts = products.filter(p => p.isPopular);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Text style={styles.productEmoji}>{item.image}</Text>
            {item.isNew && (
              <Chip style={styles.newBadge} textStyle={styles.badgeText}>
                Nuevo
              </Chip>
            )}
            {item.isPopular && (
              <Chip style={styles.popularBadge} textStyle={styles.badgeText}>
                ⭐ Popular
              </Chip>
            )}
          </View>

          {/* Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.cookTime}>• {item.cookTime}</Text>
            </View>

            <Text style={styles.price}>
              ${item.price.toLocaleString('es-CO')}
            </Text>
          </View>

          {/* Add Button */}
          <IconButton
            icon="plus-circle"
            iconColor={theme.colors.primary}
            size={30}
            onPress={() => handleAddToCart(item)}
            style={styles.addButton}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar platillos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(category => (
            <Chip
              key={category.id}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipSelected
              ]}
              textStyle={selectedCategory === category.id && styles.categoryTextSelected}
              icon={category.icon}
            >
              {category.name}
            </Chip>
          ))}
        </ScrollView>

        {/* Popular Section */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Más Populares</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {popularProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.popularCard}
                  onPress={() => router.push(`/product/${product.id}`)}
                >
                  <View style={styles.popularImageContainer}>
                    <Text style={styles.popularEmoji}>{product.image}</Text>
                  </View>
                  <Text style={styles.popularName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.popularPrice}>
                    ${product.price.toLocaleString('es-CO')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Todos los Platillos' : categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productsGrid}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No se encontraron productos
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  categoriesContainer: {
    maxHeight: 60,
    backgroundColor: theme.colors.surface,
  },
  categoriesContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  categoryChip: {
    marginRight: spacing.sm,
  },
  categoryChipSelected: {
    backgroundColor: theme.colors.primary,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  horizontalList: {
    paddingRight: spacing.md,
    gap: spacing.md,
  },
  popularCard: {
    width: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: spacing.md,
    alignItems: 'center',
    elevation: 2,
  },
  popularImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 40,
    marginBottom: spacing.sm,
  },
  popularEmoji: {
    fontSize: 40,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  popularPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  productsGrid: {
    paddingBottom: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  productCard: {
    width: cardWidth,
  },
  card: {
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  cardContent: {
    position: 'relative',
  },
  imageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness,
    position: 'relative',
  },
  productEmoji: {
    fontSize: 50,
  },
  newBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: theme.colors.success,
    height: 24,
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: theme.colors.secondary,
    height: 24,
  },
  badgeText: {
    fontSize: 10,
    marginVertical: 0,
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    fontSize: 12,
    color: theme.colors.text,
    marginLeft: spacing.xs,
  },
  cookTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    margin: 0,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});