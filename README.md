# Lume CRM

A professional, production-ready CRM system for mobile medspas and IV therapy businesses. Built with Next.js 16, PostgreSQL, and modern UI components.

## Features

### Core CRM
- **Customer Management** - Complete customer profiles with contact info, health history, notes, and payment methods
- **Appointment Scheduling** - Smart calendar with multi-staff support and availability management
- **GPS Route Optimization** - AI-powered routing for mobile practitioners
- **Forms Builder** - Custom intake forms, consent documents, and waivers with e-signature support
- **Billing & Invoicing** - Stripe-integrated payments, invoices, and financial reporting

### HIPAA & SOC2 Compliance
- End-to-end encryption for all PHI (Protected Health Information)
- Comprehensive audit logging
- Role-based access control (RBAC)
- Multi-tenant architecture with strict data isolation
- Session management with automatic timeout
- Data retention policies

### Modern UI/UX
- Apple/ElevenLabs-inspired design
- Smooth animations with Framer Motion
- Responsive design for all devices
- Dark mode support
- PWA-ready for mobile use

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **UI**: Tailwind CSS, Radix UI, Framer Motion
- **Payments**: Stripe
- **Maps**: Mapbox / Google Maps
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/lume-crm.git
cd lume-crm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lume_crm?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"
```

4. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The database is designed for multi-tenant SaaS with:

- **Organizations** - Tenant isolation
- **Users** - Staff accounts with role-based access
- **Customers** - Client profiles with health records
- **Services** - Service catalog with forms assignment
- **Appointments** - Scheduling with GPS routing
- **Forms** - Dynamic form builder with responses
- **Routes** - Optimized travel planning
- **Invoices & Payments** - Billing management

See `prisma/schema.prisma` for the complete schema.

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard & app pages
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── landing/             # Landing page components
│   ├── dashboard/           # Dashboard components
│   ├── forms/               # Form components
│   ├── calendar/            # Calendar components
│   ├── maps/                # Map components
│   └── charts/              # Chart components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── store/                   # Zustand state management
└── types/                   # TypeScript type definitions
```

## API Routes

- `POST /api/auth/*` - Authentication endpoints
- `GET/POST /api/customers` - Customer CRUD
- `GET/POST /api/appointments` - Appointment management
- `GET/POST /api/services` - Service catalog
- `GET/POST /api/staff` - Staff management
- `GET/POST /api/routes` - Route planning
- `GET/POST /api/forms` - Form management
- `POST /api/webhooks/stripe` - Stripe webhooks

## Features in Detail

### Form Builder

Create custom forms with:
- Text inputs, textareas
- Select dropdowns, checkboxes
- Date pickers
- File uploads
- E-signature fields
- Conditional logic

Assign forms to services for automatic distribution when booking.

### GPS Route Optimization

- Optimize daily routes for staff
- Real-time traffic integration
- Estimated travel times
- Multi-stop scheduling
- Live location tracking

### Customer Portal

White-labeled customer portal for:
- Appointment booking
- Form completion
- Payment processing
- Document access
- Communication history

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Docker

```bash
docker build -t lume-crm .
docker run -p 3000:3000 lume-crm
```

### Environment Variables

See `.env.example` for all required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@lumecrm.com or join our Discord community.