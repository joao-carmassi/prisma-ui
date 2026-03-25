import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MdxTableProps {
  children?: React.ReactNode;
}

interface TableSectionProps {
  children?: React.ReactNode;
}

function parseRows(children: React.ReactNode): React.ReactNode[] {
  return Array.isArray(children) ? children.flat() : [children];
}

function MdxThead({ children }: TableSectionProps): React.ReactNode {
  return <TableHeader>{parseRows(children)}</TableHeader>;
}

function MdxTbody({ children }: TableSectionProps): React.ReactNode {
  return <TableBody>{parseRows(children)}</TableBody>;
}

function MdxTr({ children }: TableSectionProps): React.ReactNode {
  return (
    <TableRow className='bg-background border-b-border'>
      {parseRows(children)}
    </TableRow>
  );
}

function MdxTh({ children }: TableSectionProps): React.ReactNode {
  return (
    <TableHead className='text-muted-foreground font-medium bg-muted px-4'>
      {children}
    </TableHead>
  );
}

function MdxTd({ children }: TableSectionProps): React.ReactNode {
  return <TableCell className='p-4'>{children}</TableCell>;
}

function MdxTable({ children }: MdxTableProps): React.ReactNode {
  return (
    <Card className='not-prose my-6 p-0 overflow-hidden shadow-md'>
      <CardContent className='p-0'>
        <Table>{children}</Table>
      </CardContent>
    </Card>
  );
}

export { MdxTable, MdxThead, MdxTbody, MdxTr, MdxTh, MdxTd };
