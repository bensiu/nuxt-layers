export type SectionVariant = 'default' | 'subtle' | 'primary'

export interface MarkupSEO {
  serviceType: string
  name?: string
  description?: string
}

export interface SEO {
  title: string
  description: string
  author?: string
  markup?: MarkupSEO
}

export interface BreadCrumbsItem {
  label: string
  href?: string
}

export interface FeatureItemProps {
  title: string
  description?: string
  icon?: string
  items?: string[]
  link?: string
  linkTitle?: string
  ui?: {
    title?: string
  }
}

export interface SectionContentProps {
    lead?: string
    title: string
    description?: string
    content?: string[]
    variant?: SectionVariant
    class?: string
    items?: FeatureItemProps[]
}
