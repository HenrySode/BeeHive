# Database Design

This document explains the data model in plain terms. If `backend/prisma/schema.prisma` exists, it is the source of truth and this file should track it. Until then, this file is the source of truth.

Database: PostgreSQL. ORM: Prisma.

## Entities

### User (staff account)

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| name | string | |
| email | string | unique |
| passwordHash | string | bcrypt or argon2 |
| role | enum | OWNER_ADMIN, MANAGER_DISPATCHER, OFFICE_CS, FIELD_TECHNICIAN |
| isActive | boolean | default true, set false to deactivate instead of deleting |
| createdAt | datetime | |
| updatedAt | datetime | |

Relationships: has many Appointment (as technician), has many Job (as assigned technician), has many Communication (as sender), has many ActivityLog (as actor).

Indexes: unique on `email`, index on `role`.

### Customer

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| name | string | |
| phone | string | |
| email | string | nullable, not every customer gives an email |
| address | string | |
| tags | string[] | relationship (maintenance, repair, installation), see below |
| createdAt | datetime | |
| updatedAt | datetime | |

Relationships: has many Equipment, has many Appointment, has many Job (through Appointment), has many ServiceRequest, has many Communication.

Tags cover two things per `prd.md` FR-C3: relationship type (maintenance, repair, installation) and equipment type or service received. Store as a string array or a join table to a `Tag` lookup if the list needs to be managed centrally; a join table is preferred once tag management (near FR-S1) is needed.

Indexes: index on `phone`, index on `email`, GIN index on `tags` if stored as an array.

### Equipment

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| customerId | uuid | foreign key to Customer |
| type | string | for example furnace, heat pump, mini split |
| makeModel | string | nullable |
| installDate | date | nullable |
| notes | text | nullable |

Relationships: belongs to Customer.

Indexes: index on `customerId`, index on `type`.

### ServiceRequest

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| customerId | uuid | nullable, set once matched to a customer |
| name | string | from the public form |
| phone | string | |
| email | string | |
| address | string | |
| serviceType | string | references ServiceCategory |
| preferredAt | datetime | nullable, customer's preferred date and time |
| message | text | nullable |
| status | enum | NEW, ACTIONED, ARCHIVED |
| source | enum | WEBSITE, PHONE, MANUAL |
| createdAt | datetime | |

Relationships: optionally belongs to Customer, produces at most one Appointment when converted.

Indexes: index on `status`, index on `customerId`, index on `createdAt`.

### Appointment

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| customerId | uuid | foreign key to Customer |
| technicianId | uuid | foreign key to User, nullable until assigned |
| serviceRequestId | uuid | nullable, set if created from a request |
| scheduledAt | datetime | |
| status | enum | SCHEDULED, EN_ROUTE, IN_PROGRESS, COMPLETED, CANCELLED |
| notes | text | nullable |
| createdAt | datetime | |
| updatedAt | datetime | |

Relationships: belongs to Customer, belongs to User (technician), has one Job.

Indexes: index on `technicianId`, index on `scheduledAt`, index on `status`.

### Job

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| appointmentId | uuid | foreign key to Appointment |
| status | enum | mirrors Appointment status for the work itself |
| workDone | text | nullable |
| notes | text | nullable |
| photos | string[] | object storage URLs, Phase 3 |
| completedAt | datetime | nullable |

Relationships: belongs to Appointment.

Indexes: index on `appointmentId`, index on `status`.

### ServiceCategory

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| name | string | for example Heating Services, Furnaces, Boilers |
| slug | string | unique, used in the public URL |
| description | text | shown on the category page |
| isActive | boolean | default true |

Indexes: unique on `slug`.

The fourteen services in the discovery brief (heating, cooling, furnaces, boilers, heat pumps, mini splits, humidifiers, dehumidification, ductwork, ventilation, dryer vent cleaning, preventive maintenance, repair, installation) seed this table. See `content.md` for the copy.

### Communication

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| customerId | uuid | nullable if sent to a segment rather than one customer |
| segment | string | nullable, tag or filter used if sent to a group |
| channel | enum | EMAIL, SMS |
| template | string | which message template was used |
| sentAt | datetime | |
| sentBy | uuid | foreign key to User, nullable for automated sends |
| status | enum | SENT, FAILED, QUEUED |

Indexes: index on `customerId`, index on `sentAt`, index on `channel`.

### ActivityLog

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| type | string | what happened, for example "appointment.created" |
| entityRef | string | id of the affected record |
| actorId | uuid | foreign key to User, nullable for system actions |
| timestamp | datetime | |
| meta | jsonb | extra detail, kept small |

Indexes: index on `entityRef`, index on `actorId`, index on `timestamp`.

Supports `prd.md` NFR-10, auditability: who changed what, when.

## Open items

- Whether `Customer.tags` is a plain array or a managed `Tag` table with its own admin screen, depends on how much control staff need over the tag list (FR-S1).
- Whether `ServiceRequest.serviceType` is a free string or a foreign key to `ServiceCategory`. A foreign key is recommended once the category list is stable.
- Retention period for `ActivityLog` and `Communication` records, to confirm with the client.
