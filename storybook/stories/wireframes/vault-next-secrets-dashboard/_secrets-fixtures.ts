/* =============================================================
   Vault Next Secrets Dashboard - Story fixtures
   Documents the data shapes used in PDR 007 wireframes.
   Stage 5 / PDR-007.26.05.19.PDR-Wireframes-VaultNextSecretsDashboard
   ============================================================= */

export interface SecretStoreRow {
  name: string;
  project: string;
  secrets: number;
  status: 'available' | 'pending deletion';
  ageMedian?: string;
}

export interface BarRow {
  label: string;
  value: number;
}

export interface HistogramBin {
  label: string;
  value: number;
}

/* PDR 007 § Day 0 - Stores table source */
export const storesDay0: SecretStoreRow[] = [
  { name: 'payments-app-store', project: 'payments-prd', secrets: 412, status: 'available' },
  { name: 'payments-ci-store', project: 'payments-prd', secrets: 108, status: 'available' },
  { name: 'checkout-store', project: 'payments-prd', secrets: 220, status: 'available' },
  { name: 'analytics-etl-store', project: 'analytics', secrets: 96, status: 'available' },
  { name: 'retired-legacy-kv', project: 'payments-prd', secrets: 0, status: 'pending deletion' },
  { name: 'fraud-ml-store', project: 'analytics', secrets: 162, status: 'available' },
  { name: 'gateway-keys', project: 'payments-prd', secrets: 88, status: 'available' },
  { name: 'mobile-bff-store', project: 'payments-prd', secrets: 76, status: 'available' },
  { name: 'ops-bot-store', project: 'analytics', secrets: 44, status: 'available' },
  { name: 'internal-svc-store', project: 'payments-prd', secrets: 78, status: 'available' },
];

/* PDR 007 § Day 1 - Stores table with Age column */
export const storesDay1: SecretStoreRow[] = [
  { name: 'payments-app-store', project: 'payments-prd', secrets: 412, status: 'available', ageMedian: '14d' },
  { name: 'payments-ci-store', project: 'payments-prd', secrets: 108, status: 'available', ageMedian: '9d' },
  { name: 'checkout-store', project: 'payments-prd', secrets: 220, status: 'available', ageMedian: '21d' },
  { name: 'analytics-etl-store', project: 'analytics', secrets: 96, status: 'available', ageMedian: '38d' },
  { name: 'retired-legacy-kv', project: 'payments-prd', secrets: 0, status: 'pending deletion', ageMedian: '-' },
  { name: 'fraud-ml-store', project: 'analytics', secrets: 162, status: 'available', ageMedian: '6d' },
  { name: 'gateway-keys', project: 'payments-prd', secrets: 88, status: 'available', ageMedian: '52d' },
  { name: 'mobile-bff-store', project: 'payments-prd', secrets: 76, status: 'available', ageMedian: '18d' },
];

/* PDR 007 § Day 0 and Day 1 - Secrets by type
   Source: Secrets Metrics CSV > # of Secrets by type */
export const secretsByType: BarRow[] = [
  { label: 'login', value: 812 },
  { label: 'aws-iam', value: 220 },
  { label: 'pg-password', value: 96 },
  { label: 'pg-cert', value: 84 },
  { label: 'json', value: 72 },
];

/* PDR 007 § Day 0 and Day 1 - Secrets by status
   Source: Secrets Metrics CSV > # of Secrets by status */
export const secretsByStatus: BarRow[] = [
  { label: 'active', value: 1210 },
  { label: 'pending deletion', value: 74 },
];

/* PDR 007 § Day 1 - Auth methods used to access secrets
   Gated on access-log instrumentation */
export const authMethodsUsed: BarRow[] = [
  { label: 'oidc', value: 612 },
  { label: 'approle', value: 180 },
  { label: 'kubernetes', value: 96 },
  { label: 'userpass', value: 54 },
];

/* PDR 007 § Day 1 - Secrets by age histogram
   Gated on Prometheus availability */
export const secretsAgeHistogram: HistogramBin[] = [
  { label: '0-1d', value: 38 },
  { label: '1-7d', value: 142 },
  { label: '7-30d', value: 486 },
  { label: '30-90d', value: 412 },
  { label: '90d+', value: 206 },
];

/* PDR 007 § Day 1 - TTL approaching counters */
export const ttlApproaching = {
  next7d: 18,
  next30d: 42,
};

/* PDR 007 § Day 1 - Recently rotated list (last 7 days) */
export const recentlyRotated: { label: string; time: string }[] = [
  { label: 'checkout-store / db-creds', time: '2h ago' },
  { label: 'payments-app-store / api-key', time: '8h ago' },
  { label: 'analytics-etl-store / svc-acct', time: '1d ago' },
  { label: 'fraud-ml-store / model-token', time: '2d ago' },
  { label: 'payments-ci-store / build-key', time: '3d ago' },
];

/* PDR 007 § Day 0 and Day 1 - Tile values */
export const tilesDay0 = {
  secrets: '1,284',
  stores: '18',
  clients: '754',
  pendingDeletion: '74',
};

export const tilesDay1 = {
  secrets: { value: '1,284', delta: '+24' },
  stores: { value: '18', delta: '+1' },
  clients: { value: '754', delta: '+21' },
  pendingDeletion: { value: '74', delta: '-3' },
};
