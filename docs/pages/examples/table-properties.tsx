import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import TablePropertiesExample from '~/examples/TablePropertiesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/table-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/TablePropertiesExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>DataTable</Code> component exposes the basic properties of the internal{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Mantine Table</ExternalLink> component and implements a
        number of additional ones. Try to customize some of them interactively below:
      </PageText>
      <TablePropertiesExample initialCode={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
