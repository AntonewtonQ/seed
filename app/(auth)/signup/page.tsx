import Link from 'next/link';
import {AuthCard} from '@/components/auth/auth-card';
export const metadata={title:'Contas de demonstração | SEED'};
export default function Page(){return <AuthCard title="Contas de demonstração" description="Esta versão académica usa contas fictícias já preparadas. Não há registo público." switchAction="Entrar" switchHref="/login" switchText="Já tem as credenciais?"><p className="text-sm leading-6">Há contas de startup, de investidor e de aceleradora. O README explica como criá-las; as palavras-passe são geradas no seu computador.</p><Link href="/" className="mt-5 inline-block text-sm underline underline-offset-4">Voltar ao início</Link></AuthCard>}
