import { ref, watch } from 'vue';
import PrivacySettings from '@/components/PrivacySettings.vue';

interface SettingsMap {
  general: GeneralSettings;
  notifications: NotificationsSettings;
  privacy: PrivacySettings;
}

type SettingsKey = keyof SettingsMap;

interface GeneralSettings {
  username: string;
  email: string;
  about: string;
  gender: string;
  country: string;
}

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key);
  // ako u localStorage postoji item pod kljucem 'general' onda vraca njega a ako ne postoji onda vraca default objekat
  return stored !== null ? JSON.parse(stored) : defaults;
};

const watcher =
  <T extends SettingsKey>(key: T) =>
  (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

// inicijalizovanje podataka za GeneralSettings
const general = ref<GeneralSettings>(
  init('general', {
    username: '',
    email: '',
    about: '',
    gender: 'male',
    country: 'Other',
  }),
);

// sa watch() postizemo to da se prilikom svake promene podataka u localStorage upise ta promena
// prati se promena vrednosti general konstante i izvrsava se kod u (value) => {}
// sa {deep:true} setujemo da se prate promene property-a general objekta
watch(general, watcher('general'), { deep: true });

interface NotificationsSettings {
  email: boolean;
  sms: boolean;
}

const notifications = ref<NotificationsSettings>(
  init('notifications', {
    email: false,
    sms: false,
  }),
);

watch(notifications, watcher('notifications'), { deep: true });

type Visibility = 'private' | 'public';

interface PrivacySettings {
  visibility: Visibility;
  searchEngineIndexing: boolean;
}

const privacy = ref<PrivacySettings>(
  init('privacy', {
    visibility: 'public',
    searchEngineIndexing: false,
  }),
);

watch(privacy, watcher('privacy'), { deep: true });

export function useSettings() {
  return {
    general,
    notifications,
    privacy,
  };
}
