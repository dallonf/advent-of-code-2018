export interface Node {
  childNodes: Node[];
  metadata: number[];
}

export const interpretTree = (input: number[]): Node => {
  let i = 0;
  const readFromStream = () => {
    if (i >= input.length) {
      throw new Error(
        `Reading past input stream; tried to read number at #${i} but stream is only ${
          input.length
        } long`
      );
    }
    const nextNumber = input[i];
    i += 1;
    return nextNumber;
  };
  const readNode = (): Node => {
    const childNodeCount = readFromStream();
    const metadataCount = readFromStream();

    const childNodes = [];
    for (let iChildNode = 0; iChildNode < childNodeCount; iChildNode++) {
      childNodes.push(readNode());
    }

    const metadata = [];
    for (let iMetadata = 0; iMetadata < metadataCount; iMetadata++) {
      metadata.push(readFromStream());
    }

    return { childNodes, metadata };
  };

  const node = readNode();
  return node;
};
export const sumMetadata = (input: Node): number => {
  return (
    input.metadata.reduce((a, b) => a + b, 0) +
    input.childNodes.map(x => sumMetadata(x)).reduce((a, b) => a + b, 0)
  );
};

export const valueOfNode = (input: Node): number => {
  if (input.childNodes.length) {
    return input.metadata
      .map(x => {
        const referencedChildNode = input.childNodes[x - 1];
        if (!referencedChildNode) return 0;
        return valueOfNode(referencedChildNode);
      })
      .reduce((a, b) => a + b, 0);
  } else {
    return input.metadata.reduce((a, b) => a + b, 0);
  }
};
