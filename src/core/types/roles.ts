export const ROLES_VALIDAS = [
  'ADMIN',
  'DIRETOR',
  'COORDENADOR',
  'PROFESSOR',
] as const
export type RoleValida = (typeof ROLES_VALIDAS)[number]
