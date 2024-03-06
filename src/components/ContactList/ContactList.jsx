import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors.js";
import { selectFilters } from "../../redux/filter/selectors.js";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

function ContactList() {
  const contacts = useSelector(selectContacts);
  const filters = useSelector(selectFilters);

  const visibleContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filters.toLowerCase());
  });

  if (visibleContacts.length !== 0)
    return (
      <ul className={css.list}>
        {visibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    );
}

export default ContactList;
