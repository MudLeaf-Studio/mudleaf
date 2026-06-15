import BlogPostContent from './BlogPostContent'

const SLUGS = ['tamil', 'horticulture', 'brand', 'garden-to-table']

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }))
}

export default function BlogPostPage() {
  return <BlogPostContent />
}
