# CES Website Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [CMS Administration](#cms-administration)
3. [Live Chat Integration](#live-chat-integration)
4. [Development Guide](#development-guide)
5. [Deployment](#deployment)

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB installed locally
- Git

### Installation
```bash
# Install dependencies
npm install

# Start development servers
npm run dev        # Frontend (Vite)
npm run cms:dev    # CMS (Payload)
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
```
MONGODB_URI=mongodb://localhost/ces-cms
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

## CMS Administration

### Accessing Admin Panel
- URL: `http://localhost:3000/admin`
- Create initial admin account on first login

### Content Management

#### Sections
Control every section of the website:
- Enable/disable sections
- Modify content, titles, descriptions
- Update button text and URLs
- Configure popup content
- Reorder sections
- Manage media assets

#### Button Management
1. Navigate to `Sections` collection
2. Select the section containing the button
3. Under `content`, find the button configuration:
   - URL/Link
   - Text
   - Action type (link, popup, scroll)
   - Popup content (if applicable)

#### Media Library
- Supported formats: images, videos
- Automatic image optimization
- Multiple size variants
- Alt text and captions

### User Management
- Create admin/editor accounts
- Manage permissions
- Access control by role

## Live Chat Integration

### Tawk.to Setup
1. Create account at [tawk.to](https://tawk.to)
2. Get your Property ID and Widget ID
3. Update `LiveChat.tsx`:
```typescript
s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
```

### Chat Features
- Real-time visitor communication
- Customizable chat widget
- Mobile responsive
- Visitor tracking
- Chat history

## Development Guide

### Project Structure
```
├── cms/
│   ├── collections/    # CMS collection definitions
│   └── payload-types.ts
├── docs/              # Documentation
├── public/            # Static assets
├── src/
│   ├── components/    # React components
│   ├── lib/          # Utilities
│   └── main.tsx      # Entry point
├── server.ts         # CMS server
└── payload.config.ts # CMS configuration
```

### Key Components
- `FluidCanvas`: Background animation
- `LiveChat`: Chat integration
- `SectionTitle`: Animated section headers
- `FloatingNav`: Navigation menu

### Adding New Features

#### New Section
1. Create component in `src/components/`
2. Add to `Sections` collection in CMS
3. Update `App.tsx` to render section
4. Add to navigation in `FloatingNav.tsx`

#### New Collection
1. Create collection file in `cms/collections/`
2. Add to `payload.config.ts`
3. Generate types: `npm run generate-types`

## Deployment

### Frontend (Vite)
```bash
npm run build
```
Deploy `dist/` to your hosting provider

### CMS (Payload)
1. Set up MongoDB database
2. Configure environment variables
3. Deploy server:
```bash
npm run cms:build
npm start
```

### Production Considerations
- Use production MongoDB instance
- Set secure PAYLOAD_SECRET
- Configure proper CORS settings
- Set up SSL/TLS
- Configure proper backups
- Monitor server resources

## Troubleshooting

### Common Issues

#### CMS Connection Issues
- Check MongoDB connection
- Verify environment variables
- Check network/firewall settings

#### Live Chat Not Working
- Verify Tawk.to credentials
- Check browser console for errors
- Clear browser cache

#### Animation Performance
- Reduce particle count in FluidCanvas
- Optimize image sizes
- Check browser GPU acceleration

## Support
For additional support:
1. Check documentation
2. Review GitHub issues
3. Contact development team

## Updates and Maintenance
- Regular dependency updates
- Security patches
- Feature additions
- Performance optimization