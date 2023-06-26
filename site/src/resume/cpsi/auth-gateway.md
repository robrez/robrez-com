---
title: Authorization Server and API Gateway
company: CPSI
category: project
startDate: 2017-03-01
endDate:
itemTags:
  - OAuth
  - OIDC
  - Lit
  - Polymer
  - JAX-RS / Jersey
  - SpringBoot
  - GKE
  - OpenTelemetry
  - Prometheus
  - AppInsights
  - HELM
  - Redis
---

Created authorization and authentification infrastructure using [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) and [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) standards.

Created an API gateway to facilitate secure ingress to resource servers.

Created webapp which allows admins to manage clients, scopes, grant-types, keys; to revoke access and refresh tokens; and, to allow client-initiated [registration](https://openid.net/specs/openid-connect-registration-1_0.html) requests for access to APIs.

Created webapp which supports fulfillment of the "authorization redirects" via the "authorization endpoint"

In 2021, moved this infrastructure from VM hosting to GKE. This involved adding health, metrics and telemetry. Redis was introduced as a distributed cache. Some configuration was re-implemented as ConfigMaps created via helm /sprig templates
