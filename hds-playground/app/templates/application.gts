import { pageTitle } from 'ember-page-title';
import GatewayPrototype from 'hds-playground/components/gateways/gateway-prototype';

<template>
  {{pageTitle "HVD Gateways - HDS Playground"}}
  <GatewayPrototype />

  {{outlet}}
</template>
