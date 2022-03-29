export function dropProps<K extends string>(...props: K[]) {
  const shouldForwardProp = (prop: K) => !props.includes(prop);
  return { shouldForwardProp };
}
