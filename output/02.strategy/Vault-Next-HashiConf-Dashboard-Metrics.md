# Vault Next - HashiConf Dashboard Metrics

Combined from `Vault_Next_HashiConf_Dashboard_Metrics(*).csv` exports.

## Secrets Metrics

Source: `Vault_Next_HashiConf_Dashboard_Metrics(Secrets Metrics).csv`

| Metric Name | Effort | Notes |
| --- | --- | --- |
| # of Secrets |  |  |
| ? by type |  |  |
| ? by project |  |  |
| ? by store |  |  |
| ? by status |  |  |
| ? by age (newest ? oldest relevant to now) |  |  |
| Age of secrets |  |  |
| ? TTL |  |  |
| ? Time since creation |  |  |
| # Clients/type (human/machine) |  |  |
| # Stores ("available"/pending deletion) |  |  |
| CREATED BY', 'LAST ACCESSED' OUT OF SCOPE |  |  |

## Cryptography Metrics

Source: `Vault_Next_HashiConf_Dashboard_Metrics(Cryptography Metrics).csv`

| Metric Name | Effort | Notes |
| --- | --- | --- |
| # of Keys by type (symmetric, asymmetric, MAC) |  |  |
| ? by type (symmetric, asymmetric, MAC) |  |  |
| ? by project |  |  |
| ? by store |  |  |
| ? by age (newest ? oldest relevant to now) |  |  |
| # of Key versions (per key) |  |  |
| ? by algorithm (enabled, disabled, pending deletion) |  |  |
| ? by state (active, decrypt-only, disabled, pending deletion) |  |  |
| Age of keys |  |  |
| ? TTL |  |  |
| ? Time since creation |  |  |
| CREATED BY', 'LAST ACCESSED' OUT OF SCOPE |  |  |

## Operational Traffic Metrics

Source: `Vault_Next_HashiConf_Dashboard_Metrics(Operational Traffic Metrics).csv`

| Metric Name | Effort | Complexity/Notes | Reference |
| --- | --- | --- | --- |
| Overall requests by type (Read/write) |  |  |  |
| Overall response time of Requests / latency |  |  |  |
| Most used/least used stores / scopes |  |  |  |
| # API calls |  |  |  |
| ALL OPERATIONAL METRICS OUT OF HASHI SCOPE |  |  |  |

## Users, Entities, Identities

Source: `Vault_Next_HashiConf_Dashboard_Metrics(Users_Entities_Identities).csv`

| Metric Name | Effort | Notes |
| --- | --- | --- |
| # Stores |  |  |
| ? by status (available, unavailable) |  |  |
| # Clients |  |  |
| ? by type (human, NHI, agent) |  |  |
| # Auth methods |  |  |
| ? # "accounts" per method |  |  |
| ? user mapping |  |  |

## Filtering Requirements

Source: `Vault_Next_HashiConf_Dashboard_Metrics(Filtering Requirements).csv`

| Filter Category | Effort | Notes |
| --- | --- | --- |
| By Auth Method |  |  |
| By Secret |  |  |
| By Entity |  |  |
| By Time Range |  | Requires a time-series database (e.g., Prometheus). |
| Organization |  |  |
| Project |  |  |
