import React from "react";
import styles from './NotebookCreator.module.css'
import { useForm } from "react-hook-form"
import { useState } from "react"

//notebook creator component on the right side of the notebook page.
const NotebookCreator = () => {
    const [topics, setTopics] = useState(topicsList)
    const [subTopics, setSubTopics] = useState([{ id: 0, display: "Select Topic..." }])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            notebookName: "",
            topic: 0, // Default to "Select Topic"
            subTopic: 0 // Default to "Select Topic"
        },
        mode: "onBlur" // Validate on blur
    })

    //backend proccesses the id of the form values
    const onSubmit = (data) => {
        console.log(data) //later to be sent to notebooks.api.js
    }

    // Populate the topic dropdown with topics from the topicsList
    const topicOptions = topics.map((topic) => {
        return (
            <option key={topic.id} value={topic.id} style={{ color: topic.id === 0 ? 'lightgray' : 'var(--text-main)' }} className={styles.option}>
                {topic.display}
            </option>
        )
    })

    // Populate the subtopic dropdown with subtopics from the subtopicsList
    const subTopicOptions = subTopics.map((subtopic) => {
        return (
            <option key={subtopic.id} value={subtopic.id} className={styles.option}>
                {subtopic.display}
            </option>
        )
    })

    // Function to populate subtopics based on the selected topic
    const subTopicPopulateBasedOnTopic = (e) => {
        const topicID = e.target.value
        const selectedSubTopics = topics.find(t => t.id == topicID).subtopics
        console.log(topicID)
        console.log(selectedSubTopics)
        
        if(topicID === 0){
            // If "Select Topic" is chosen, reset subtopics to nothings selected
            setSubTopics([{ id: 0, display: "Select Topic..." }]);
        }else{
            setSubTopics(selectedSubTopics)
        }
    }

    const nameOptions = {
        required: 'A name is required',
        maxLength: {
            value: 50,
            message: 'Name cannot exceed 50 characters'
        },
        pattern: {
            value: /^[A-Za-z0-9 ]+$/,
            message: 'Name can only contain letters and numbers'
        },
        minLength: {
            value: 3,
            message: 'Name must be at least 3 characters'
        }
    }

    const colorMap = {
        0: "rgb(49, 180, 114)", 
        1: "rgb(92, 189, 92)",
        2: "rgb(197, 174, 70)",
        3: "rgb(197, 85, 70)"
    }

    const difficultyMap = {
        0: "Basic",
        1: "Medium",
        2: "Hard",
        3: "Very Hard"
    }


    //to do: integrate with back end POST create request

    return (
        <div className={styles.notebookCreatorContainer}>
            <h2 className={styles.creatorTitle}>Notebook Creator</h2>
            <p className={styles.instructions}>Fill out the fields below to create a new notebook, and generate 5 unique math problems with solutions.</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <fieldset className={styles.fieldSet}>
                    <label className={styles.label}>Name</label>
                    <input type="text" {...register("notebookName", nameOptions)} className={styles.notebookNameInput} placeholder="Enter Name..."></input>
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label className={styles.label}>Select Topic</label>
                    {/* Topic dropdown */}                                                      
                    <select {...register("topic")} className={styles.notebookDropdown} onChange={subTopicPopulateBasedOnTopic} style={{ color: subTopics[0].id === 0 ? "#757576": "var(--text-main)"}}> {/* If subtopics id = 0 then that means topic hasnt been selected yet, could use useRef but this is easier */}  
                        {topicOptions}
                    </select>
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label className={styles.label}>Select Sub-Topic</label>
                    <select {...register("subTopic")} className={styles.notebookDropdown} style={{ color: subTopics[0].id === 0 ? "#757576": "var(--text-main)"}}>
                        {subTopicOptions}
                    </select>
                </fieldset>
                <fieldset className={styles.fieldSet}>
                    <label className={styles.label}>Difficulty</label>
                    <input {...register("difficulty")} className={styles.notebookRange} type="range" min={0} max={3} defaultValue={1}>
                    </input>
                    <p className={styles.difficultyText} style={{ color: colorMap[watch("difficulty")]}}>{difficultyMap[watch("difficulty")]}</p>
                </fieldset>
                <button type="submit" className={styles.createButton} style={{ backgroundColor: errors.notebookName ? "rgb(246, 106, 106)" : "var(--bg-secondary)"}}>
                    {errors.notebookName ? errors.notebookName.message : "Create Notebook"}
                </button>
            </form>

        </div>
    )
}

export default NotebookCreator

//list of topics with their subtopics for parsing into topic dropdown
const topicsList = [
    {
        id: 0,
        display: "Select Topic...",
        subtopics: [
            { id: 0, display: "Select Topic..." }
        ]
    },
    {
      id: 1,
      display: "Arithmetic",
      subtopics: [
        { id: 1, display: "Operations (Addition, Subtraction, Multiplication, Division)" },
        { id: 2, display: "Fractions" },
        { id: 3, display: "Decimals" },
        { id: 4, display: "Percents" },
        { id: 5, display: "Factors and Multiples" },
        { id: 6, display: "Order of Operations" },
        { id: 7, display: "Number Properties" }
      ]
    },
    {
      id: 2,
      display: "Algebra",
      subtopics: [
        { id: 1, display: "Expressions and Variables" },
        { id: 2, display: "Linear Equations" },
        { id: 3, display: "Inequalities" },
        { id: 4, display: "Systems of Equations" },
        { id: 5, display: "Quadratic Equations" },
        { id: 6, display: "Polynomials" },
        { id: 7, display: "Factoring" },
        { id: 8, display: "Exponents and Powers" },
        { id: 9, display: "Radicals and Roots" },
        { id: 10, display: "Rational Expressions" },
        { id: 11, display: "Logarithms" }
      ]
    },
    {
      id: 3,
      display: "Geometry",
      subtopics: [
        { id: 1, display: "Points, Lines, and Planes" },
        { id: 2, display: "Angles" },
        { id: 3, display: "Triangles" },
        { id: 4, display: "Quadrilaterals and Polygons" },
        { id: 5, display: "Circles" },
        { id: 6, display: "Coordinate Geometry" },
        { id: 7, display: "Transformations (Translation, Rotation, Reflection, Dilation)" },
        { id: 8, display: "Constructions" },
        { id: 9, display: "Symmetry" }
      ]
    },
    {
      id: 4,
      display: "Trigonometry",
      subtopics: [
        { id: 1, display: "Trigonometric Functions" },
        { id: 2, display: "Unit Circle" },
        { id: 3, display: "Right Triangle Trigonometry" },
        { id: 4, display: "Graphing Trigonometric Functions" },
        { id: 5, display: "Trigonometric Identities" },
        { id: 6, display: "Inverse Trigonometric Functions" },
        { id: 7, display: "Trigonometric Equations" },
        { id: 8, display: "Laws of Sines and Cosines" }
      ]
    },
    {
      id: 5,
      display: "Pre-Calculus",
      subtopics: [
        { id: 1, display: "Functions and Their Graphs" },
        { id: 2, display: "Polynomial and Rational Functions" },
        { id: 3, display: "Exponential and Logarithmic Functions" },
        { id: 4, display: "Trigonometric Functions (Advanced)" },
        { id: 5, display: "Sequences and Series" },
        { id: 6, display: "Conic Sections" },
        { id: 7, display: "Parametric Equations" },
        { id: 8, display: "Polar Coordinates" }
      ]
    },
    {
      id: 6,
      display: "Calculus",
      subtopics: [
        { id: 1, display: "Limits and Continuity" },
        { id: 2, display: "Differentiation Basics" },
        { id: 3, display: "Techniques of Differentiation" },
        { id: 4, display: "Applications of Derivatives" },
        { id: 5, display: "Integration Basics" },
        { id: 6, display: "Techniques of Integration" },
        { id: 7, display: "Applications of Integration" },
        { id: 8, display: "Fundamental Theorem of Calculus" },
        { id: 9, display: "Multivariable Calculus" },
        { id: 10, display: "Partial Derivatives and Multiple Integrals" }
      ]
    },
    {
      id: 7,
      display: "Linear Algebra",
      subtopics: [
        { id: 1, display: "Vectors and Vector Operations" },
        { id: 2, display: "Matrices" },
        { id: 3, display: "Determinants" },
        { id: 4, display: "Systems of Linear Equations" },
        { id: 5, display: "Vector Spaces" },
        { id: 6, display: "Linear Transformations" },
        { id: 7, display: "Eigenvalues and Eigenvectors" },
        { id: 8, display: "Matrix Diagonalization" }
      ]
    }
  ];
  