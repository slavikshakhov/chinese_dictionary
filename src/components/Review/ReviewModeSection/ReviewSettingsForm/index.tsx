import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ReviewFormInputs } from "../types";
import { Checkbox, Grid, Button, FormControlLabel } from "@mui/material";

interface IProps {
  formSubmitHandler: (data: ReviewFormInputs) => void;
  reviewSettings: ReviewFormInputs;
}

const ReviewSettingsForm = ({ formSubmitHandler, reviewSettings }: IProps) => {
  const { control, handleSubmit } = useForm<ReviewFormInputs>();
  const { showCharacter, showWords, showPinyin, showMeaning, showExamples } =
    reviewSettings;
  return (
    <form>
      <Grid container sx={{ width: "600px" }}>
        <Grid item xs={2}>
          <Controller
            name="showCharacter"
            control={control}
            defaultValue={showCharacter}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label="character"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="showWords"
            control={control}
            defaultValue={showWords}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label="words"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="showPinyin"
            control={control}
            defaultValue={showPinyin}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label="pinyin"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="showMeaning"
            control={control}
            defaultValue={showMeaning}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label="meaning"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="showExamples"
            control={control}
            defaultValue={showExamples}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
                label="examples"
              />
            )}
          />
        </Grid>
        <Button size="small" onClick={handleSubmit(formSubmitHandler)}>
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default ReviewSettingsForm;
