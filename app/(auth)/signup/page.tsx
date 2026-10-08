import Link from 'next/link';
import {AuthCard} from '@/components/auth/auth-card';
export const metadata={title:'Contas de demonstração | SEED'};
export default function Page(){return <AuthCard title="Acesso à demonstração" eyebrow="SEED local" description="Esta versão académica utiliza contas fictícias previamente preparadas." switchAction="Entrar" switchHref="/login" switchText="Já tem as credenciais?"><p>As contas de startup, investidor e aceleradora estão descritas no README do projeto. As palavras-passe são geradas localmente durante a preparação da demonstração.</p><p className="mt-4 text-sm text-muted-foreground">Não existe registo público ou envio de pedidos de acesso nesta versão.</p><Link href="/" className="mt-5 inline-block underline">Voltar ao início</Link></AuthCard>}
