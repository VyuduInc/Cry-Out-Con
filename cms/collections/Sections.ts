import { CollectionConfig } from 'payload/types';

export const Sections: CollectionConfig = {
  slug: 'sections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'isEnabled'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Stats', value: 'stats' },
        { label: 'Dive In', value: 'diveIn' },
        { label: 'Keynotes', value: 'keynotes' },
        { label: 'Video', value: 'video' },
        { label: 'Exhibitor Info', value: 'exhibitorInfo' },
        { label: 'Featured', value: 'featured' },
        { label: 'Registration', value: 'registration' },
        { label: 'Insights', value: 'insights' },
        { label: 'News', value: 'news' },
        { label: 'Partners', value: 'partners' },
      ],
    },
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this section',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        elements: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'blockquote', 'link', 'ol', 'ul',
          'textAlign', 'indent', 'relationship',
        ],
        leaves: [
          'bold', 'italic', 'underline', 'strikethrough',
        ],
      },
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
  ],
};