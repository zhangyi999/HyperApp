import styledComponents from "styled-components";

const Wrap = styledComponents.div`
  background: rgba(2,10,26,0.3);
  border-radius: 10px;
  position: relative;
  ${(p) => p.style}
`;

const Label = styledComponents.span`
    font-size: 1.2rem;
    color: #bebfc8;
    text-align: left;
    display: inline-block;
    font-weight: 500;
    line-height: 1.4rem;
    padding: 12px 14px 0;
    margin: unset;
`;

function FormItem({ label, children, wrapStyle }) {
  return (
    <Wrap style={wrapStyle}>
      <Label>{label}</Label>
      {children}
    </Wrap>
  );
}

export default FormItem;
