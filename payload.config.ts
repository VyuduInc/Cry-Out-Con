import { buildConfig } from 'payload/config';
import path from 'path';

import { Users } from './cms/collections/Users';
import { Sections } from './cms/collections/Sections';
import { Speakers } from './cms/collections/Speakers';
import { Media } from './cms/collections/Media';
import { Settings } from './cms/collections/Settings';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Cry Out Con Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [
    Users,
    Sections,
    Speakers,
    Media,
    Settings,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'cms/payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'cms/generated-schema.graphql'),
  },
});