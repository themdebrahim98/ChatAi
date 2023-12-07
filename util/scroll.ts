export const scrollToBottom = (containerRef: any) => {
  // Access the last child of the containerRef
  const lastChild = containerRef.current.lastElementChild;
  lastChild.scrollIntoView({ behavior: "smooth" });
  console.log(lastChild);
};
