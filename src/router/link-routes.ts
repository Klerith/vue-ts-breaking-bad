export interface RouterLink {
    name:  string;
    path:  string;
    title: string;
}


export const routeLinks: RouterLink[]  = [
    { path: '/', name: 'home', title: 'Inicio' },
    { path: '/about', name: 'about', title: 'Sobre' },
    { path: '/characters', name: 'characters', title: 'Personajes' },
];
