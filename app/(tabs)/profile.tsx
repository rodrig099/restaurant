import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, List, Switch, Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.guestContainer}>
        <MaterialCommunityIcons 
          name="account-circle-outline" 
          size={100} 
          color={theme.colors.textSecondary} 
        />
        <Text style={styles.guestTitle}>Inicia sesión</Text>
        <Text style={styles.guestSubtitle}>
          Accede a tu cuenta para ver tu perfil y pedidos
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/(auth)/login')}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
        >
          Iniciar Sesión
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push('/(auth)/register')}
          style={styles.registerButton}
          contentStyle={styles.buttonContent}
        >
          Crear Cuenta
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user.name.substring(0, 2).toUpperCase()}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <Divider style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Reseñas</Text>
          </View>
          <Divider style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>⭐ 4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi Cuenta</Text>
        
        <List.Item
          title="Editar Perfil"
          description="Actualiza tu información personal"
          left={props => <List.Icon {...props} icon="account-edit" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to edit profile */}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Direcciones"
          description={user.addresses?.length ? `${user.addresses.length} direcciones guardadas` : 'Agrega una dirección'}
          left={props => <List.Icon {...props} icon="map-marker" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to addresses */}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Métodos de Pago"
          description="Gestiona tus tarjetas y métodos de pago"
          left={props => <List.Icon {...props} icon="credit-card" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to payment methods */}}
          style={styles.listItem}
        />
      </View>

      <Divider />

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        
        <List.Item
          title="Notificaciones"
          description="Recibe actualizaciones de tus pedidos"
          left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
        
        <List.Item
          title="Modo Oscuro"
          description="Cambia el tema de la aplicación"
          left={props => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
        
        <List.Item
          title="Idioma"
          description="Español"
          left={props => <List.Icon {...props} icon="translate" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Language selector */}}
          style={styles.listItem}
        />
      </View>

      <Divider />

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        
        <List.Item
          title="Centro de Ayuda"
          description="Preguntas frecuentes y tutoriales"
          left={props => <List.Icon {...props} icon="help-circle" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to help */}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Contactar Soporte"
          description="Estamos aquí para ayudarte"
          left={props => <List.Icon {...props} icon="message-text" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to support */}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Términos y Condiciones"
          left={props => <List.Icon {...props} icon="file-document" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to terms */}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Política de Privacidad"
          left={props => <List.Icon {...props} icon="shield-check" color={theme.colors.primary} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* TODO: Navigate to privacy */}}
          style={styles.listItem}
        />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          textColor={theme.colors.error}
          style={styles.logoutButton}
          contentStyle={styles.buttonContent}
          icon="logout"
        >
          Cerrar Sesión
        </Button>
      </View>

      {/* App Version */}
      <Text style={styles.version}>Versión 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: theme.colors.background,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  guestSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  loginButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  registerButton: {
    width: '100%',
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  section: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  listItem: {
    backgroundColor: theme.colors.surface,
  },
  logoutSection: {
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
  version: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: 12,
    paddingVertical: spacing.xl,
  },
});