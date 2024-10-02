type Props = {
  title: string;
  value?: string | number;
  unit?: string;
};

const TableGridEntry = (props: Props) => {
  return (
    <div className="flex flex-col justify-center font-roboto-mono font-bold">
      <div>{props.title}</div>
      <div>
        {props.value ? props.value : '-'} {props.unit}
      </div>
    </div>
  );
};

export default TableGridEntry;
