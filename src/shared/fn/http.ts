
export interface HttpFnLibrary {
  getUrlParameter(sParam: string): string | undefined;
}

export function getUrlParameter(sParam: string): string | undefined {
  const sPageURL: string = window.location.search.substring(1);
  const sURLVariables: string[] = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName: string[] = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return;
}
