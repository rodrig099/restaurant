import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'preparing' | 'on_way' | 'delivered' | 'cancelled';
  items: number;
  total: number;
  deliveryAddress: string;
}

const mockOrders: Order[] = [
  {
    id: '001',
    date: '2025-10-23 14:30',
    status: 'on_way',
    items: 3,
    total: 45000,
    deliveryAddress: 'Calle 10 #20-30, Neiva',
  },
  {
    id: '002',
    date: '2025-10-20 19:15',
    status: 'delivered',
    items: 2,
    total: 38000,
    deliveryAddress: 'Calle 10 #20-30, Neiva',
  },
  {
    id: '003',
    date: '2025-10-18 12:45',
    status: 'delivered',
    items: 4,
    total: 52000,
    deliveryAddress: 'Calle 10 #20-30, Neiva',
  },
  {
    id: '004',
    date: '2025-10-15 20:00',
    status: 'cancelled',
    items: 1,
    total: 28000,
    deliveryAddress: 'Calle 10 #20-30, Neiva',
  },
];

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendiente',
          color: theme.colors.textSecondary,
          icon: 'clock-outline',
        };
      case 'preparing':
        return {
          label: 'Preparando',
          color: '#FF9800',
          icon: 'chef-hat',
        };
      case 'on_way':
        return {
          label: 'En camino',
          color: '#2196F3',
          icon: 'moped',
        };
      case 'delivered':
        return {
          label: 'Entregado',
          color: theme.colors.success,
          icon: 'check-circle',
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          color: theme.colors.error,
          icon: 'close-circle',
        };
    }
  };

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons 
          name="receipt-text-outline" 
          size={100} 
          color={theme.colors.textSecondary} 
        />
        <Text style={styles.emptyTitle}>Inicia sesión</Text>
        <Text style={styles.emptySubtitle}>
          Accede a tu cuenta para ver tu historial de pedidos
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/(auth)/login')}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
        >
          Iniciar Sesión
        </Button>
      </View>
    );
  }

  const activeOrders = mockOrders.filter(order => 
    ['pending', 'preparing', 'on_way'].includes(order.status)
  );
  
  const pastOrders = mockOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Pedidos Activos</Text>
          {activeOrders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <TouchableOpacity 
                key={order.id}
                onPress={() => {/* TODO: Navigate to order detail */}}
              >
                <Card style={styles.orderCard}>
                  <Card.Content>
                    {/* Header */}
                    <View style={styles.orderHeader}>
                      <View style={styles.orderIdContainer}>
                        <Text style={styles.orderLabel}>Pedido</Text>
                        <Text style={styles.orderId}>#{order.id}</Text>
                      </View>
                      <Chip
                        icon={statusInfo.icon}
                        style={[styles.statusChip, { backgroundColor: `${statusInfo.color}20` }]}
                        textStyle={[styles.statusText, { color: statusInfo.color }]}
                      >
                        {statusInfo.label}
                      </Chip>
                    </View>

                    {/* Progress Indicator for active orders */}
                    {order.status !== 'cancelled' && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill,
                              { 
                                width: order.status === 'on_way' ? '75%' : 
                                       order.status === 'preparing' ? '50%' : '25%',
                                backgroundColor: statusInfo.color,
                              }
                            ]} 
                          />
                        </View>
                      </View>
                    )}

                    {/* Details */}
                    <View style={styles.orderDetails}>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                          name="calendar" 
                          size={16} 
                          color={theme.colors.textSecondary} 
                        />
                        <Text style={styles.detailText}>{order.date}</Text>
                      </View>
                      
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                          name="package-variant" 
                          size={16} 
                          color={theme.colors.textSecondary} 
                        />
                        <Text style={styles.detailText}>
                          {order.items} {order.items === 1 ? 'producto' : 'productos'}
                        </Text>
                      </View>

                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                          name="map-marker" 
                          size={16} 
                          color={theme.colors.textSecondary} 
                        />
                        <Text style={styles.detailText} numberOfLines={1}>
                          {order.deliveryAddress}
                        </Text>
                      </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.orderFooter}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>
                        ${order.total.toLocaleString('es-CO')}
                      </Text>
                    </View>

                    {/* Action Button */}
                    <Button
                      mode="contained"
                      onPress={() => {/* TODO: Track order */}}
                      style={styles.trackButton}
                      icon="map-marker-path"
                    >
                      Rastrear Pedido
                    </Button>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Past Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Historial</Text>
        {pastOrders.length > 0 ? (
          pastOrders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <TouchableOpacity 
                key={order.id}
                onPress={() => {/* TODO: Navigate to order detail */}}
              >
                <Card style={styles.orderCard}>
                  <Card.Content>
                    {/* Header */}
                    <View style={styles.orderHeader}>
                      <View style={styles.orderIdContainer}>
                        <Text style={styles.orderLabel}>Pedido</Text>
                        <Text style={styles.orderId}>#{order.id}</Text>
                      </View>
                      <Chip
                        icon={statusInfo.icon}
                        style={[styles.statusChip, { backgroundColor: `${statusInfo.color}20` }]}
                        textStyle={[styles.statusText, { color: statusInfo.color }]}
                      >
                        {statusInfo.label}
                      </Chip>
                    </View>

                    {/* Details */}
                    <View style={styles.orderDetails}>
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                          name="calendar" 
                          size={16} 
                          color={theme.colors.textSecondary} 
                        />
                        <Text style={styles.detailText}>{order.date}</Text>
                      </View>
                      
                      <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                          name="package-variant" 
                          size={16} 
                          color={theme.colors.textSecondary} 
                        />
                        <Text style={styles.detailText}>
                          {order.items} {order.items === 1 ? 'producto' : 'productos'}
                        </Text>
                      </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.orderFooter}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>
                        ${order.total.toLocaleString('es-CO')}
                      </Text>
                    </View>

                    {/* Actions */}
                    {order.status === 'delivered' && (
                      <View style={styles.actionButtons}>
                        <Button
                          mode="outlined"
                          onPress={() => {/* TODO: Reorder */}}
                          style={styles.reorderButton}
                          icon="replay"
                        >
                          Reordenar
                        </Button>
                        <Button
                          mode="text"
                          onPress={() => {/* TODO: Leave review */}}
                          icon="star"
                        >
                          Calificar
                        </Button>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>
              No hay pedidos en el historial
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  loginButton: {
    paddingHorizontal: spacing.xl,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  orderCard: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  orderLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: spacing.xs,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  orderDetails: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  trackButton: {
    borderRadius: theme.roundness,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  reorderButton: {
    flex: 1,
  },
  noOrdersContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});