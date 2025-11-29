// frontend/src/utils/translations.js
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    tenants: 'Tenants',
    payments: 'Payments',
    bills: 'Bills',
    rooms: 'Rooms',
    reports: 'Reports',
    settings: 'Settings',
    
    // Dashboard
    dashboard: 'Dashboard',
    welcomeBack: 'Welcome Back! 👋',
    overview: 'Overview',
    totalTenants: 'Total Tenants',
    occupiedRooms: 'Occupied Rooms',
    pendingRents: 'Pending Rents',
    pendingBills: 'Pending Bills',
    monthlyRevenue: 'Monthly Revenue',
    quickActions: 'Quick Actions',
    addTenant: 'Add Tenant',
    addPayment: 'Add Payment',
    addBill: 'Add Bill',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    
    // Tenants
    searchTenants: 'Search tenants or room number...',
    all: 'All',
    paid: 'Paid',
    pending: 'Pending',
    left: 'Left',
    active: 'Active',
    
    // Forms
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    roomNumber: 'Room Number',
    monthlyRent: 'Monthly Rent',
    securityDeposit: 'Security Deposit',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    save: 'Save',
    cancel: 'Cancel',
    
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    
    // Settings
    profile: 'Profile',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    darkMode: 'Dark Mode',
    language: 'Language',
    notifications: 'Notifications',
  },
  es: {
    // Navigation
    home: 'Inicio',
    tenants: 'Inquilinos',
    payments: 'Pagos',
    bills: 'Facturas',
    rooms: 'Habitaciones',
    reports: 'Informes',
    settings: 'Configuración',
    
    // Dashboard
    dashboard: 'Panel',
    welcomeBack: '¡Bienvenido de nuevo! 👋',
    overview: 'Resumen',
    totalTenants: 'Total Inquilinos',
    occupiedRooms: 'Habitaciones Ocupadas',
    pendingRents: 'Rentas Pendientes',
    pendingBills: 'Facturas Pendientes',
    monthlyRevenue: 'Ingresos Mensuales',
    quickActions: 'Acciones Rápidas',
    addTenant: 'Agregar Inquilino',
    addPayment: 'Agregar Pago',
    addBill: 'Agregar Factura',
    recentActivity: 'Actividad Reciente',
    viewAll: 'Ver Todo',
    
    // Tenants
    searchTenants: 'Buscar inquilinos o número de habitación...',
    all: 'Todos',
    paid: 'Pagado',
    pending: 'Pendiente',
    left: 'Salió',
    active: 'Activo',
    
    // Forms
    fullName: 'Nombre Completo',
    phoneNumber: 'Número de Teléfono',
    roomNumber: 'Número de Habitación',
    monthlyRent: 'Renta Mensual',
    securityDeposit: 'Depósito de Seguridad',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    status: 'Estado',
    save: 'Guardar',
    cancel: 'Cancelar',
    
    // Auth
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    email: 'Correo',
    password: 'Contraseña',
    logout: 'Cerrar Sesión',
    
    // Settings
    profile: 'Perfil',
    editProfile: 'Editar Perfil',
    changePassword: 'Cambiar Contraseña',
    darkMode: 'Modo Oscuro',
    language: 'Idioma',
    notifications: 'Notificaciones',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    tenants: 'Locataires',
    payments: 'Paiements',
    bills: 'Factures',
    rooms: 'Chambres',
    reports: 'Rapports',
    settings: 'Paramètres',
    
    // Dashboard
    dashboard: 'Tableau de bord',
    welcomeBack: 'Bon retour! 👋',
    overview: 'Aperçu',
    totalTenants: 'Total Locataires',
    occupiedRooms: 'Chambres Occupées',
    pendingRents: 'Loyers en Attente',
    pendingBills: 'Factures en Attente',
    monthlyRevenue: 'Revenu Mensuel',
    quickActions: 'Actions Rapides',
    addTenant: 'Ajouter Locataire',
    addPayment: 'Ajouter Paiement',
    addBill: 'Ajouter Facture',
    recentActivity: 'Activité Récente',
    viewAll: 'Voir Tout',
    
    // Tenants
    searchTenants: 'Rechercher locataires ou numéro de chambre...',
    all: 'Tous',
    paid: 'Payé',
    pending: 'En Attente',
    left: 'Parti',
    active: 'Actif',
    
    // Forms
    fullName: 'Nom Complet',
    phoneNumber: 'Numéro de Téléphone',
    roomNumber: 'Numéro de Chambre',
    monthlyRent: 'Loyer Mensuel',
    securityDeposit: 'Dépôt de Garantie',
    startDate: 'Date de Début',
    endDate: 'Date de Fin',
    status: 'Statut',
    save: 'Enregistrer',
    cancel: 'Annuler',
    
    // Auth
    login: 'Connexion',
    signup: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe',
    logout: 'Déconnexion',
    
    // Settings
    profile: 'Profil',
    editProfile: 'Modifier le Profil',
    changePassword: 'Changer le Mot de Passe',
    darkMode: 'Mode Sombre',
    language: 'Langue',
    notifications: 'Notifications',
  },
};

export const getTranslation = (lang, key) => {
  if (translations[lang] && translations[lang][key]) return translations[lang][key];
  if (translations.en && translations.en[key]) return translations.en[key];
  return key;
};

export default translations;
