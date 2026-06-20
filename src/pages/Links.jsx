import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

import styles from "./Links.module.css";
import ToastMessage from "../components/ToastMessage";
import LinkCard from "../components/LinkCard";

import illustrationEmpty from "/images/illustration-empty.svg";
import iconChangesSaved from "/images/icon-changes-saved.svg";

function Links() {
  const { links, setLinks } = useOutletContext();
  const [showToast, setShowToast] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddLink = () => {
    const newLink = {
      id: Date.now(),
      platform: "Github",
      url: "",
    };
    setLinks([...links, newLink]);
    setIsSubmitted(false);
  };

  const handleRemoveLink = (idToRemove) => {
    setLinks(links.filter((link) => link.id !== idToRemove));
  };

  const handleLinkChange = (id, field, value) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isValid = links.every((link) => link.url.trim() !== "");

    if (!isValid) {
      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section className={styles.formCardContainer}>
      <div className={styles.formHeaderContainer}>
        <h1 className={styles.formTitle}>Customize your links</h1>
        <p className={styles.formSubtitle}>Add/edit/remove links below and then share all your profiles with the world!</p>
      </div>

      <form className={styles.detailsForm} onSubmit={handleSave}>
        <button className={styles.addLinkButton} type="button" onClick={handleAddLink}>
          + Add new link
        </button>

        {links.length === 0 ? (
          <div className={styles.emptyStateContainer}>
            <img className={styles.emptyStateImg} src={illustrationEmpty} alt="No links" />
            <h2 className={styles.emptyStateTitle}>Let's get you started</h2>
            <p className={styles.emptyStateText}>
              Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to
              help you share your profiles with everyone!
            </p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
              <div className={styles.linkCardsContainer}>
                {links.map((link, index) => (
                  <LinkCard
                    key={link.id}
                    id={link.id}
                    link={link}
                    index={index}
                    onRemove={() => handleRemoveLink(link.id)}
                    onChange={(field, value) => handleLinkChange(link.id, field, value)}
                    isSubmitted={isSubmitted}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <div className={styles.formFooterContainer}>
          <button className={styles.submitButton} type="submit" disabled={links.length === 0}>
            Save
          </button>
        </div>
      </form>

      {showToast && <ToastMessage message="Your changes have been successfully saved!" icon={iconChangesSaved} />}
    </section>
  );
}

export default Links;
