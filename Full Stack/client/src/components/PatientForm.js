import React, { useState } from 'react'
import { Grid, TextField, Button, FormControl, FormGroup, FormLabel, Container, FormControlLabel, Checkbox } from '@mui/material'
import Store from './store'

const PatientForm = () => {
    const [cid, setCid] = useState('')
    const [formData, setFormData] = useState({
        highBP: false,
        highChol: false,
        cholCheck: false,
        bmi: 0,
        smoker: false,
        stroke: false,
        diabetes: false,
        physActivity: false,
        fruits: false,
        veggies: false,
        hvyAlcoholConsump: false,
        anyHealthcare: false,
        noDocbcCost: false,
        genHlth: 0,
        mentHlth: 0,
        physHlth: 0,
        diffWalk: false,
        sex: false,
        age: 0,
        education: 0,
        income: 0,
        uploadedFile: ''
    })

    const handleChange = async (e) => {
        let { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        if (checked) {
            checked = 1
        } else {
            checked = 0
        }

        setFormData({
            ...formData,
            [name]: newValue,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        formData['uploadedFile'] = cid
        
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (response.ok) {
            const json = await response.json()
            if (json.prediction) {
                alert('You may suffer from a heart ailment')
            } else {
                alert('You are currently safe')
            }
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl>
                        <FormLabel>Patient Information</FormLabel>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="highBP"
                                        checked={formData.highBP}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HighBP"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="highChol"
                                        checked={formData.highChol}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HighChol"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="cholCheck"
                                        checked={formData.cholCheck}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="CholCheck"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="BMI"
                                name="bmi"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="smoker"
                                        checked={formData.smoker}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Smoker"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="stroke"
                                        checked={formData.stroke}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Stroke"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="diabetes"
                                        checked={formData.diabetes}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Diabetes"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="physActivity"
                                        checked={formData.physActivity}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="PhysActivity"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="fruits"
                                        checked={formData.fruits}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Fruits"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="veggies"
                                        checked={formData.veggies}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Veggies"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="hvyAlcoholConsump"
                                        checked={formData.hvyAlcoholConsump}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HvyAlcoholConsump"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="anyHealthcare"
                                        checked={formData.anyHealthcare}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="AnyHealthcare"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="noDocbcCost"
                                        checked={formData.noDocbcCost}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="NoDocbcCost"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="GenHlth"
                                name="genHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="MentHlth"
                                name="MentHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="PhysHlth"
                                name="physHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="diffWalk"
                                        checked={formData.diffWalk}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="DiffWalk"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="sex"
                                        checked={formData.sex}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Gender (Tick this if you are male)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Age"
                                name="age"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Education"
                                name="education"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Income"
                                name="income"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Store
                                handleChange={setCid}
                            />
                        </Grid>
                    </FormControl>
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default PatientForm
