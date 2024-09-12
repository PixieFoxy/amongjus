import { FormEvent, useRef, useState } from "react";

type Props = {
  onClose: () => void;
};

const ActionFormModal = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const modalRef = useRef(null);

  function closeModal(e: React.MouseEvent) {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert([email, password]);
  }

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50"
    >
      <form id="action-form" className="bg-silver" onSubmit={handleSubmit}>
        <button
          className="place-self-end p-0 m-0 mt-[-1.5rem] mr-[-1.5rem] size-12 icon-[icon-park-outline--close-one] bg-black hover:bg-ash-gray-700"
          onClick={props.onClose}
        ></button>
        <h1 className="font-overlock text-2xl pb-4">
          Congratulations, you've made the first step towards the better you!
        </h1>
        <label htmlFor="email">Email</label>
        <input
          className="bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="jusjus@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button type="submit" className="font-permanent-marker bg-ash-gray-200">I WANNA DRINK JÜS !</button>
      </form>
    </div>
  );
};

export default ActionFormModal;
