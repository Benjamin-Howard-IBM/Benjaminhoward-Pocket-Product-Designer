import { pageTitle } from 'ember-page-title';
import FormatStartup from 'hds-playground/components/format-startup';

<template>
  {{pageTitle "HDS Playground"}}
  <FormatStartup />

  {{outlet}}
</template>
