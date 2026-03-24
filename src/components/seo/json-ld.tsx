import serialize from 'serialize-javascript';
import type { Thing, WithContext } from 'schema-dts';

interface JsonLdProps {
  data: WithContext<Thing>;
}

export function JsonLd({ data }: JsonLdProps): React.ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data, { isJSON: true }) }}
    />
  );
}
