<template>
  <top-bar/>
  <parse-error/>
</template>
<script>
import TopBar from "@/components/bar/TopBar";
import ParseError from "@/components/error/ParseError";

export default {
  name: 'Error',
  components: {
    TopBar,
    ParseError,
  }
}
</script>