import { useRuntimeConfig } from "#app";

const Properties = () => {
  const config = useRuntimeConfig()
  return {
    SERVER_LINK: config.public.VUE_APP_API,
    CONTEXT_PATH: ''
  }
}

export default Properties;
