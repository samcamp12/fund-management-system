export function transposeFXData(data: { [date: string]: { [key: string]: string } }): Array<{ date: string; close: string }> {
    return Object.keys(data).map(date => ({
      date,
      close: data[date]["4. close"],
    }));
  }