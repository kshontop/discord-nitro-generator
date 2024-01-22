
# DISCORD NITRO BOOST GENERATRO

## Authors

- [@kshontop](https://github.com/kshontop)


## Deployment

To deploy this project run

```bash
npm install node-fetch uuid colors
npm install
node main.js
```


## API Reference

```http
POST /v1/direct-fulfillment

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `partnerUserId` | `string` | **Required**. User UUID |


```http
GET /billing/partner-promotions/${promotionId}/${token}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `promotionId`      | `string` | **Required**. Promotion ID|
| `token`      | `string` | **Required**. Nitro code token|

#### Example :
Generated URL: `https://discord.com/billing/partner-promotions/1180231712274387115/generated_nitro_token`

### Notes
Request Nitro Code: The POST /v1/direct-fulfillment endpoint is used to request a Nitro code for a specific user identified by partnerUserId.

Get Promotion URL: The GET /billing/partner-promotions/${promotionId}/${token} endpoint is used to retrieve the promotion URL for a given Nitro code.

Please ensure that you replace generated_nitro_token and 1180231712274387115 with actual values used by your API.

![Logo](https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_Discord_Nitro_2560x1440_withlogo_2560x1440-944994658df3b04d0c4940be832da19e)

