
export function firebaseObjectValToArray(object: Record<string, any>) {
    return Object.entries(object).map(([key, value], i) => {
      return {
        id: key,
        ...value,
      };
    });
  }