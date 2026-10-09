<script setup>
import { ref, onMounted } from 'vue'
import { cercarpelicula } from '@/services/communicationManager'
import { cercarPeliculaInfo } from '@/services/communicationManager'

const isLoading = ref(false)
const cerca = ref('')
const resultats = ref([])
const info = ref('')


async function infoPelicula(id){
    info.value = await cercarPeliculaInfo(id)
    //informacio.value = info.strInstructionsES
    console.log(info)
}
async function buscar(){
    isLoading.value = true
    try{
        resultats.value = await cercarpelicula(cerca.value)
        await new Promise((resolve) => setTimeout(resolve, 600)) 
    }finally{
        isLoading.value= false
    }
    console.log(resultats.value)
}
</script>
<template>
    <v-container>
        <v-text-field v-model="cerca"
            label="Què vols cercar?"
            @keyup.enter="buscar"
        ></v-text-field>
        <v-btn @click="buscar">Cercar</v-btn>
        <v-overlay v-model="isLoading" class="align-center justify-center" persistent>
        <v-progress-circular
            color="primary"
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <template #no-data>
        <v-empty-state
            icon="mdi-alert-circle-outline"
            title="No Data Found"
            text="We couldn't retrieve any records. Try adjusting your filters or reload."
            class="py-8"
        ></v-empty-state>
        </template>
        <v-row>
            <v-col v-for="element in resultats"
                cols="12"
                md="4"
            >
                <v-card>
                    {{ element.Title }}
                    <img :src="element.Poster" alt="">
                    <div>{{ informacio }}</div>
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn
                            v-bind="activatorProps"
                            color="surface-variant"
                            text="Més informació"
                            @click="infoPelicula(element.imdbID)"
                            variant="flat"
                            ></v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card title="Dialog">
                            <v-card-text>
                                Plot: {{ info?.Plot }}
                            </v-card-text>
                            <v-card-text>
                                Director{{ info?.Director }}
                            </v-card-text>
                            <v-card-text>
                                Actors: {{ info?.Actors }}
                            </v-card-text>
                            <v-card-text>
                                Gènere: {{ info?.Genre }}
                            </v-card-text>
                            <v-card-text>
                                Any: {{ info?.Year }}
                            </v-card-text>
                            <v-card-text>
                                Durada: {{ info?.Runtime }}
                            </v-card-text>
                            <v-card-text>
                                Puntuació: {{ info?.Ratings[0].Value }}
                            </v-card-text>


                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                text="Close Dialog"
                                @click="isActive.value = false"
                                ></v-btn>
                            </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>